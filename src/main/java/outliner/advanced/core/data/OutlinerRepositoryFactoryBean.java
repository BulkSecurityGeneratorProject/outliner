package outliner.advanced.core.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.support.JpaRepositoryFactory;
import org.springframework.data.jpa.repository.support.JpaRepositoryFactoryBean;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.core.RepositoryInformation;
import org.springframework.data.repository.core.RepositoryMetadata;
import org.springframework.data.repository.core.support.RepositoryFactorySupport;

import javax.persistence.EntityManager;
import java.io.Serializable;

/**
 * Outliner Repository Factory Bean allowing us to use the JpaRepositoryImpl
 */
public class OutlinerRepositoryFactoryBean<R extends JpaRepository<T, I>, T, I extends Serializable>
		extends JpaRepositoryFactoryBean<R, T, I> {

	public OutlinerRepositoryFactoryBean(Class<? extends R> repositoryInterface) {
		super(repositoryInterface);
		// TODO Auto-generated constructor stub
	}

	protected RepositoryFactorySupport createRepositoryFactory(EntityManager entityManager) {
		return new OutlinerRepositoryFactory(entityManager);
	}

	private static class OutlinerRepositoryFactory extends JpaRepositoryFactory {
		public OutlinerRepositoryFactory(EntityManager entityManager) {
			super(entityManager);
		}

		@Override
		protected SimpleJpaRepository<?, ?> getTargetRepository(RepositoryInformation info,
				EntityManager entityManager) {
			RepositoryMetadata metadata = (RepositoryMetadata) info;
			return new OutlinerRepositoryImpl<>(metadata.getDomainType(), entityManager);
		}

		protected Class<?> getRepositoryBaseClass(RepositoryMetadata metadata) {
            // The RepositoryMetadata can be safely ignored, it is used by the JpaRepositoryFactory
            //to check for QueryDslJpaRepository's which is out of scope.
            return OutlinerRepositoryImpl.class;
        }
	}
}
