using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace SupermercadoDart.Models
{
    public partial class dbSupermercadoDartContext : DbContext
    {
        public dbSupermercadoDartContext()
        {
        }

        public IConfiguration Configuration { get; }

        public dbSupermercadoDartContext(IConfiguration configuration,DbContextOptions<dbSupermercadoDartContext> options)
            : base(options)
        {
            Configuration = configuration;
        }

        public virtual DbSet<Produto> Produto { get; set; }
        public virtual DbSet<Usuario> Usuario { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(Configuration.GetConnectionString("dbSupermercadoDart"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.4-servicing-10062");

            modelBuilder.Entity<Produto>(entity =>
            {
                entity.ToTable("produto");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DataAtualizacao)
                    .HasColumnName("dataAtualizacao")
                    .HasColumnType("datetime");

                entity.Property(e => e.DataCadastro)
                    .HasColumnName("dataCadastro")
                    .HasColumnType("datetime");

                entity.Property(e => e.Descricao)
                    .IsRequired()
                    .HasColumnName("descricao")
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Estoque).HasColumnName("estoque");

                entity.Property(e => e.Preco)
                    .HasColumnName("preco")
                    .HasColumnType("decimal(10, 2)");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.ToTable("usuario");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Nome)
                    .HasColumnName("nome")
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Senha)
                    .HasColumnName("senha")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });
        }
    }
}
